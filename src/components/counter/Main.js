import { connect } from "react-redux"


const mapStatetoProps=state=>{
    return {
        Count : state.Count
    }
}
const mapDispatchtoProps=dispatch=>{
    return {
        increment:()=>dispatch({type:'Increment'}),
        decrement:()=>dispatch({type:'Decrement'}),
        incrementByValue:(pay)=>dispatch({type:'IncrementByValue',payload:pay}),
        reset:()=>dispatch({type:'reset'})
    }
}
function Main(props){    
    return(
    <div className="m-4 p-2">
    {/* <CircularProgress /> */}
    <div>
    <h3>Click the Button!</h3>
    <h4>Button pressed : {props.Count.count} </h4>
    {
        console.log(props.Count.count)
    }    
    <button className="btn btn-dark" onClick={()=>props.increment()}>+</button>
    <input id="input" type="number" placeholder="Numbers"  onChange={(e)=>console.log(e)}/>
    <button className="btn btn-dark" onClick={()=>props.incrementByValue(Number(document.getElementById('input').value))}>Add</button>
    <button className="btn btn-dark" onClick={()=>props.decrement()}>-</button>
    <button className="btn btn-dark" onClick={()=>props.reset()}>reset</button>
    </div>
    </div>
    )
    }


export default connect(mapStatetoProps,mapDispatchtoProps)(Main)
