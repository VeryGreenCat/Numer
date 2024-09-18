import { useState, useEffect } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'

const Bisection =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x)=>x.Xr));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calbisection = (xl, xr) => {
        var xm,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            xm = (xl+xr)/2.0;
            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)

            scope = {
                x:xm,
            }
            fXm = evaluate(Equation, scope)

            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    //EnterPress
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            calculateRoot();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);
    //EnterPress

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calbisection(xlnum,xrnum);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueXl)
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3 flex items-center justify-center space-x-4">
                    <Form.Label>Input f(x):</Form.Label>
                    <div className="relative w-44 m-3 textInputWrapper">
                        <input placeholder="Enter Equation" type="text" className="w-full h-9 bg-[#252525] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all" id="equation" value={Equation} onChange={inputEquation} ></input>
                    </div>
                    <Form.Label>Input XL:</Form.Label>
                    <div className="relative w-44 m-3 textInputWrapper">
                        <input placeholder="XL" type="text" className="w-full h-9 bg-[#252525] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all" id="XL" onChange={inputXL} ></input>
                    </div>
                    <Form.Label>Input XR:</Form.Label>
                    <div className="relative w-44 m-3 textInputWrapper">
                        <input placeholder="XR" type="text" className="w-full h-9 bg-[#252525] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all" id="XR" onChange={inputXR} ></input>
                    </div>
                </Form.Group>
                <Button variant="dark" className="cursor-pointer transition-all bg-blue-600 text-white px-6 py-2 rounded-lg border-blue-700 border-b-[4px] hover:brightness-110 hover:translate-y-[-2px] active:translate-y-[2px] active:brightness-90" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <br></br>
            <Container>
                <h5>Answer = {X.toPrecision(7)}</h5>
                {html}
            </Container>
            
        </Container>
           
    )
}

export default Bisection