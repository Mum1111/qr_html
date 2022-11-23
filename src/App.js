import { Input, Radio,message } from "antd";
import QRCode from "qrcode.react";
import { useState } from "react";
import pic1 from "./static/img/2221.png";
import pic2 from "./static/img/2223.png";

import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [size, setSize] = useState(1024);
  const [innerImgSize, setInnerImgSize] = useState(140);
  const [value, setValue] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  // let innerImgSize = 280;

  const changeCanvasToPic = (imgSize) => {
    setSize(imgSize);
    setInnerImgSize(Math.floor(imgSize / 4))
    // innerImgSize = Math.floor(imgSize / 3);

    setTimeout(() => {
      if(url === '') {
        messageApi.open({
          type: 'error',
          content: 'URL 不能为空',
        });
        return
      }
      console.log(size, innerImgSize);
      const fileName = `${new Date().getTime()}`;
      const canvasImg = document.getElementById("qrCode"); // 获取canvas类型的二维码
      const img = new Image();
      const link = document.createElement("a");
      const evt = document.createEvent("MouseEvents");
      img.src = canvasImg.toDataURL("image/png"); // 将canvas对象转换为图片的data url
      link.style.display = "none";
      link.href = img.src;
      link.download = fileName;
      document.body.appendChild(link); // 此写法兼容可火狐浏览器
      evt.initEvent("click", false, false);
      link.dispatchEvent(evt);
      document.body.removeChild(link);
    }, 50);
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const onRadioChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="App">
      {contextHolder}
      <header className="App-header">
        <QRCode
          className="qr"
          id="qrCode"
          value={url}
          size={size} // 二维码的大小
          fgColor="#000000" // 二维码的颜色
          style={{ marginBottom: "40px" }}
          level="H"
          imageSettings={{
            // 二维码中间的logo图片
            src: value === 1 ? pic1 : value === 2 ? pic2 : "",
            height: innerImgSize,
            width: innerImgSize,
            // excavate: true, // 中间图片所在的位置是否镂空
          }}
        />
        <Radio.Group
          onChange={onRadioChange}
          size="large"
          buttonStyle="solid"
          defaultValue={1}
          value={value}
        >
          <Radio.Button value={1}>白底</Radio.Button>
          <Radio.Button value={2}>蓝底</Radio.Button>
          <Radio.Button value={3}>无底</Radio.Button>
        </Radio.Group>
        <p>
          <Input.TextArea
          // type="textarea"
            className="input_len"
            size="large"
            placeholder="输入URL"
            onChange={handleChange}
          />
        </p>
        <div className="button_group">
          <div className="App-link" onClick={() => changeCanvasToPic(1024)}>
            生成二维码(1024)
          </div>
          <div className="App-link" onClick={() => changeCanvasToPic(2048)}>
            生成二维码(2048)
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
