import { DropableSelectClick, DropableSelectHover } from './DropableSelect'


export const DropableSelectExample = () => {
    return <>
    <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{display: 'flex' ,width: '200px'}}>
            <div style={{width: '100px'}}>losdsadasdasd                         </div>
        <DropableSelectClick
            droptitle={<div>1 hello</div>}
            position='top'
        >
            <div style={{width: '300px'}}>3 hello</div>
            <div>4 hello</div>
            <div>5 hello</div>
            <div>6 hello</div>
            <div>7 hello</div>

            <DropableSelectHover
                droptitle={<div>10 hello -btn</div>}
                position='right'
            >
                <div>8 hello444</div>
                <div>9 hello</div>
                <div>10 hello</div>
                <div>11 hello</div>
                <div>12 hello</div>
            </DropableSelectHover>

        </DropableSelectClick>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{display: 'flex' ,width: '800px'}}>
            <div style={{width: '500px'}}>losdsadasdasd                         </div>
            <DropableSelectHover
                droptitle={<div>1 hello -btn</div>}
                position='left'
            >
                <div>8 hello33333333333333</div>
                <div>9 hello</div>
                <div>10 hello</div>
                <div>11 hello</div>
                <div>12 hello</div>
            </DropableSelectHover>
        </div>



        <br></br>
        <br></br>
        <br></br>
        <br></br>


        
    </>


}