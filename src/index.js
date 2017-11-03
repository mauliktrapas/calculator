import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Button extends React.Component{
    render(){
        return(
            <button className={this.props.element==='0'?"button button-zero":"button"} onClick={()=>this.props.onClick(this.props.element)}>{this.props.element}</button>
        )
    }
}


class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            total : null,
            nextNumber : null,
            operation : null,
        }
    }
    handleSignClick(buttonName){
        if(buttonName==='AC'){
            this.setState({
                total:null,
                nextNumber:null,
                operation:null,
            })
        }
        else if(buttonName==='+/-'){
            if(this.state.nextNumber){
                this.setState({
                    nextNumber : this.state.nextNumber * -1,
                })
            }
            else{
                this.setState({
                    total : this.state.total * -1,
                })
            }
        }
        else if(buttonName==='='){
            this.setState({
                total:evaluate(this.state.nextNumber,this.state.operation,this.state.total),
                nextNumber : null,
                operation : null,
            })
        }
        else {
            this.setState({
                total : evaluate(this.state.nextNumber,this.state.operation,this.state.total),
                operation: buttonName,
                nextNumber : null,
            })
        }
    }

    handleDigitClick(buttonName){
        if(buttonName==='0' && this.state.nextNumber==='0'){
            return;
        }
        if(buttonName==='.'){
            if(this.state.nextNumber!==null && this.state.nextNumber.includes('.')){
                return ;
            }
            if(this.state.nextNumber===null){
                this.setState({
                    nextNumber : '0.',
                })
            }
            else{
                this.setState({
                    nextNumber : this.state.nextNumber+buttonName,
                })
            }
            return;
        }
        if(this.state.nextNumber===null && this.state.operation===null){
            this.setState({
                nextNumber : buttonName,
                total : null,
            })
        }
        else if(this.state.nextNumber===null){
            this.setState({
                nextNumber : buttonName,
            })
        }
        else{
            this.setState({
                nextNumber : this.state.nextNumber+buttonName,
            })
        }
    }

    render(){
        const digit = ['7','8','9','4','5','6','1','2','3','0','.'];
        const sign1 = ['AC','+/-','%'];
        const sign2 = ['/','*','-','+','='];

        return(
            <div className="calculator">
                <div className="answer">{this.state.nextNumber || this.state.total || '0'}</div>
                <div className="board">
                <div className="number-sign">
                    <div>
                        {
                            sign1.map((element,index)=>
                        <Button
                            key = {index}
                            element={element}
                            onClick={(i)=>this.handleSignClick(i)} />
                        )
                        }
                    </div>
                    <div className="number">
                        {
                            digit.map((element,index)=>
                        <Button
                            key = {index}
                            element={element}
                            onClick={(i)=>this.handleDigitClick(i)} />
                        )
                        }
                    </div>

                </div>
                <div className="sign">
                    {
                        sign2.map((element,index)=>
                            <Button
                                key = {index}
                                element={element}
                                onClick={(i)=>this.handleSignClick(i)} />
                        )
                    }
                </div>
                </div>
            </div>
        )
    }
}

function evaluate(One,operation,Two){
    if(Two===null){
        return One;
    }
    if(One===null){
        return Two;
    }
    const numberOne = parseFloat(One);
    const numberTwo = parseFloat(Two);
    if(operation ==='*'){
        return numberOne*numberTwo;
    }
    if (operation === '+') {
        return numberOne+numberTwo;
    }
    if (operation === '-') {
        return numberTwo-numberOne;
    }
    if (operation === '/') {
        return numberTwo/numberOne;
    }
    if (operation === '%') {
        return numberTwo%numberOne;
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);

