//'next/image'のコンポーネントをインポートする
import Image from 'next/image'
import ActionButtonBox from './ActionButtonBox'
//import './KotatuBackgroundImage.module.css'


const KotatuRoomBackground = () => {

    
  return (
    <>
    

    <div className="over-image">
    <div className="example2"></div>
    
    <div className = "l-1">
    <button>タスク追加</button>
    </div>
    <div className = "l-2">
    <button>タスク一覧</button>
    </div>
    <div className = "l-3">
    <button>button</button>
    </div>
    </div>
    </>
  )
};

export default KotatuRoomBackground;