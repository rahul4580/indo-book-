import TrueFocus from '../../components/TrueFocus';
import CircularGallery from '../../components/CircularGallery'

function work(){
    return (
        <div style={{ width: '100vw', height: '130vh',  }}>
            
           <div style={{ width: '100vw', height: '40vh' }}>
           <TrueFocus 
sentence="MY WORK SELECTION"
manualMode={false}
blurAmount={5}
borderColor="red"
animationDuration={2}
pauseBetweenAnimations={1}
/>
           </div>

        <br/>
      
    <div style={{ width: '100vw', height: '90vh' }}>
         
    <div style={{ height: '100vh', position: 'relative' , top:'-180px'}}>
  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
</div>
    </div>



        </div>
    )
}

export default work;
