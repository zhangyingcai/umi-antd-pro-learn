import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom'
import styles from './index.less';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

/**
 * 不成熟的图片展示组件
 * { previewSrc && ImgPreview }
 * 通过改变src 来展示隐藏
 */

// 自定义实现类似modal功能

// 需要将当前Dom插入到文档中
// createPortal 一般 React 组件都是挂到父组件的this.props.children 上面，总是被最近的父组件捕获，最终到React根组件上。
// createPortal 提供将子节点渲染到 Dom 节点中的方式，该节点存在于Dom组件的层次结构之外。

// interface ProtalProps {
//     children: ReactNode,
//     handleClose: Function
// }

// let Protal = (props: ProtalProps) => {
//     const { children, handleClose } = props;
//     const { current: el } = useRef(document.createElement('div'))
//     useEffect(() => {
//         // 将组件添加到root上
//         const root = document.getElementById('root')
//         if (root) {
//             root.appendChild(el)
//         }
//         return () => {
//             if (root) {
//                 root.removeChild(el)
//             }
//         }
//     }, [])

//     return ReactDOM.createPortal(children, el)
// }

// 背景
// 图片
// 关闭按钮
// 工具toolbar
export interface ImgPreviewProps {
  src: string;
  handleClose: Function;
}

const ImgPreview: React.FC<ImgPreviewProps> = (props) => {
  const { src, handleClose } = props;
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const zoomUp = () => {
    setZoom(zoom + 0.1);
  };
  const zoomDown = () => {
    if (zoom > 0.4) {
      setZoom(zoom - 0.1);
    }
  };
  const rotateUp = () => {
    setRotate(rotate + 90);
  };
  const rotateDown = () => {
    if (rotate > 0) {
      setRotate(rotate - 90);
    }
  };
  const handleOnWheel = (e: any) => {
    if (e.deltaY > 0) {
      zoomUp();
    } else {
      zoomDown();
    }
  };
  const handleCloseClick = () => {
    setShowModal(false);
    handleClose();
  };
  return (
    <div>
      {showModal && (
        <div className={styles.previewBox}>
          <div className={styles.previewBackground} onClick={handleCloseClick} />
          <div className={styles.previewImg} onWheel={handleOnWheel}>
            <img
              src={src}
              style={{ transform: `scale(${zoom}) rotate(${rotate}deg)` }}
              alt="图片"
            />
          </div>
          <div className={styles.previewCloseBtn} onClick={handleCloseClick}>
            x
          </div>
          <div className={styles.previewToolbar}>
            <PlusCircleOutlined onClick={zoomUp} />
            <MinusCircleOutlined onClick={zoomDown} />
            <PlusCircleOutlined onClick={rotateUp} />
            <MinusCircleOutlined onClick={rotateDown} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgPreview;
