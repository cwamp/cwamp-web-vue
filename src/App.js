import { mapGetters, mapActions } from "vuex";
import { Upload, Icon, message, Form } from "ant-design-vue";
import Panel from "./components/Panel";
import * as actionTypes from "./store/action-types";
import getBase64 from "./utils/base";
import "./App.scss";

export default {
  name: "App",
  components: {
    Upload,
    Icon,
    Form
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    this[actionTypes.SWITCH_CTX](canvas, ctx);
  },

  beforeDestroy() {
    this[actionTypes.SWITCH_CTX](null, null);
  },

  computed: {
    ...mapGetters(["imageUrl", "image"])
  },

  methods: {
    handleCanvasClick: () => {
      const uploader = document.getElementById("uploader");
      uploader && uploader.click();
    },

    handleChange: info => {
      const {
        file: { status, name, type, originFileObj }
      } = info;
      if (status === "uploading") {
        message.info("上传中...");
      } else if (status === "done") {
        const filename = name.substring(0, name.lastIndexOf("."));
        const fileext = name.substring(name.lastIndexOf(".") + 1);
        getBase64(originFileObj)
          .then(imageUrl => {
            this[actionTypes.SWITCH_IMAGE](imageUrl, filename, type, fileext);
          })
          .catch(console.error);
        message.success(`${name} 上传成功.`);
      } else if (status === "error") {
        message.error(`${name} 上传失败.`);
      }
    },
    ...mapActions([actionTypes.SWITCH_CTX, actionTypes.SWITCH_IMAGE])
  },

  render() {
    const props = {
      name: "image/*",
      showUploadList: false,
      action: "https://www.mocky.io/v2/5e5223642d00008200357a86",
      onChange: info => this.handleChange(info)
    };

    const WrappedPanel = Form.create({ name: "normal_login" })(Panel);
    const { imageUrl, image } = this;

    return (
      <div className="App">
        <canvas
          id="canvas"
          width={(image && image.width) || 0}
          height={(image && image.height) || 0}
          onClick={this.handleCanvasClick}
        />
        <div className="Item" style={{ display: imageUrl ? "none" : "" }}>
          <Upload.Dragger {...props} id="uploader">
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖拽上传图片</p>
            <p className="ant-upload-hint">
              声明: 本程序不会上传任何信息到服务器, 所有操作均在本地完成
            </p>
          </Upload.Dragger>
        </div>
        <div className="Item">
          <WrappedPanel />
        </div>
      </div>
    );
  }
};
