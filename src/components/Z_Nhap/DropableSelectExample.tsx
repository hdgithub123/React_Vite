import { DropableSelectClick, DropableSelectHover } from '../ReactTables/components/utils/Others/DropSelect/DropableSelect'


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
        <div style={{display: 'flex' ,width: '800px'}}>
            <div style={{width: '100px'}}>losdsadasdasd                         </div>
        <DropableSelectClick
            droptitle={<div>123456 vfdvdfvdf</div>}
            position='top'
        >
            <div style={{width: '300px'}}>3 hellodsd dasdasda  dsad á</div>
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
            <div style={{width: '200px'}}>losdsadasdasd                         </div>
            <DropableSelectHover
                droptitle={<div>1 hello 23434 434</div>}
                position='left'
            >
                <div>8 hello3 33333 3333 3333</div>
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