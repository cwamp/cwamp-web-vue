import { mapGetters, mapActions } from "vuex";
import {
  Form,
  Select,
  Input,
  Button,
  Slider,
  Switch,
  Modal
} from "ant-design-vue";
import * as actionTypes from "../store/action-types";

export default {
  name: "Panel",
  components: {
    Form,
    Select,
    Input,
    Button,
    Slider,
    Switch,
    Modal
  },
  data() {
    return {
      previewVisible: false
    };
  },
  computed: {
    ...mapGetters([
      "canvas",
      "image",
      "filename",
      "filetype",
      "fileext",
      "fillText",
      "colors",
      "colorIndex",
      "opacity",
      "showAppName"
    ])
  },
  methods: {
    selectChanged: value => {
      const { colors, switchColor } = this.data;
      const colorIndex = colors.findIndex(
        color => color.get("color") === value
      );
      switchColor(colorIndex);
    },

    handleCancel: () => {
      this.setState({
        previewVisible: false
      });
    },

    handlePreview: () => {
      this.setState({
        previewVisible: true
      });
    },

    blobCallback: () => {
      const { filename, fileext } = this;
      return function(b) {
        let a = document.createElement("a");
        a.textContent = "Download";
        document.body.appendChild(a);
        a.style.display = "none";
        a.download = `${filename}.${fileext}`;
        a.href = window.URL.createObjectURL(b);
        a.click();
      };
    },

    download: () => {
      const { canvas, filetype } = this;
      canvas && canvas.toBlob(this.blobCallback(), filetype || "image/png", 1);
    },
    ...mapActions([
      actionTypes.SWITCH_TEXTAREA,
      actionTypes.SWITCH_COLOR,
      actionTypes.SWITCH_OPACITY,
      actionTypes.SWITCH_SHOW_APP_NAME
    ])
  },
  render: () => {
    const FromItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };

    const {
      image,
      filename,
      fileext,
      fillText,
      colors,
      colorIndex,
      opacity,
      showAppName,
      switchText,
      switchOpacity,
      switchShowAppName
    } = this;
    const selectOptions = colors.map(color => (
      <Select.Option value={color.get("color")} key={color.get("color")}>
        {color.get("text")}
      </Select.Option>
    ));

    const { previewVisible } = this.state;

    return (
      <Form labelAlign="left" className="login-form">
        <Form.Item {...FromItemLayout} label="文字" required={false}>
          <Input.TextArea
            rows={2}
            minLength={10}
            maxLength={40}
            value={fillText}
            allowClear
            placeholder="此证件仅供办理XX业务使用, 其它用途无效"
            onChange={({ target: { value } }) => switchText(value)}
          />
        </Form.Item>
        <Form.Item {...FromItemLayout} label="颜色" required={false}>
          <Select
            placeholder="请选择颜色"
            firstActiveValue="blue"
            value={colors.get(colorIndex).get("text")}
            onChange={this.selectChanged}
          >
            {selectOptions}
          </Select>
        </Form.Item>
        <Form.Item {...FromItemLayout} label="透明度" required={false}>
          <Slider
            min={0}
            max={1}
            value={opacity}
            step={0.1}
            onChange={switchOpacity}
            tooltipVisible
          />
        </Form.Item>
        <Form.Item {...FromItemLayout} label="显示名称" required={false}>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            checked={showAppName}
            onChange={checked => switchShowAppName(checked)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="default"
            block
            disabled={!image}
            onClick={this.handlePreview}
          >
            预览
          </Button>
          <Button
            type="primary"
            block
            disabled={!image}
            onClick={this.download}
          >
            保存
          </Button>
        </Form.Item>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt={`${filename}.${fileext}`}
            style={{ width: "100%" }}
            src={image}
          />
        </Modal>
      </Form>
    );
  }
};
