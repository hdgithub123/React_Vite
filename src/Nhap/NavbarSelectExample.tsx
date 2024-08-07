import{DropableSelect, DropableSelectHoverRight, DropableSelectHoverbottom} from './NavbarSelect' 


export const DropableSelectExample = () =>{
    return <>
    <DropableSelect 
    droptitle={ <div>1 hello</div>}
    >
        <div>3 hello</div>
        <div>4 hello</div>
        <div>5 hello</div>
        <div>6 hello</div>
        <div>7 hello</div>
    </DropableSelect>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <DropableSelectHoverRight 
    droptitle={ <div>1 hello</div>}
    >
        <div>3 hello33333333333333</div>
        <div>4 hello</div>
        <div>5 hello</div>
        <div>6 hello</div>
        <div>7 hello</div>
    </DropableSelectHoverRight>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <DropableSelectHoverbottom 
    droptitle={ <div>1 hello -btn</div>}
    >
        <div>3 hello33333333333333</div>
        <div>4 hello</div>
        <div>5 hello</div>
        <div>6 hello</div>
        <div>7 hello</div>
    </DropableSelectHoverbottom>




    </>
    
    
}