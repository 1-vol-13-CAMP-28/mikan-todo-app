//'next/image'のコンポーネントをインポートする
import Image from 'next/image'
//import './KotatuBackgroundImage.module.css'


const ActionButtonBox = () => {
  return (
    <>
    <p>ok</p>
    <span className = "buttonbox">
    <li>
    <div>
    <button className = "l-1">button</button>
    <button>button</button>
    <button>button</button>
    </div>
    </li>

    <button>button</button>
    </span>
    </>
  )
};

export default ActionButtonBox;