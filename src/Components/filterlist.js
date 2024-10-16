import React, { useEffect, useState } from "react";
import { Container, Button, Accordion, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { isEmpty } from "../shared/common";
import { error } from "jquery";
import { useParams } from "react-router";
function Filterlist(props) {
    const {Categorys } = useSelector((state) => state.LoginReducer);
console.log("sdguaysgduyagsuid" , Categorys)    
// const [accordiontabless, setAccordiontabless] = useState([
//     { cat: "Class", filters: [{ name: "Miner", checked: false, num: "3404" }, { name: "Engineer", checked: false, num: "648" }], no: "5" },
//     { cat: "Clothes", filters: [{ name: "Jacks", checked: false, num: "48" }, { name: "Polo", checked: false, num: "478" }], no: "31" },
//     { cat: "Collection", filters: [{ name: "Printed", checked: false, num: "48" }, { name: "Checked", checked: false, num: "478" }], no: "3" },
//     { cat: "Facial Feature", filters: [{ name: "Garnier", checked: false, num: "48" }, { name: "Axen", checked: false, num: "478" }], no: "7" },
//     { cat: "Gender", filters: [{ name: "Male", checked: false, num: "48" }, { name: "Female", checked: false, num: "478" }], no: "22" },
//     { cat: "Hair Color", filters: [{ name: "Brown", checked: false, num: "48" }, { name: "Black", checked: false, num: "478" }], no: "14" },
//     { cat: "Hair Style", filters: [{ name: "Curly", checked: false, num: "48" }, { name: "straightening", checked: false, num: "478" }], no: "9" },
//     { cat: "Headwear", filters: [{ name: "Top", checked: false, num: "48" }, { name: "Bottom", checked: false, num: "478" }], no: "18" },
//     { cat: "Special Item", filters: [{ name: "Costly", checked: false, num: "48" }, { name: "Low", checked: false, num: "478" }], no: "10" },
// ]);

// const [selfilter, setSelfilter] = useState([]);
// const [accordionOpenss, setAccordionOpenss] = useState();
// const handlechange = (name, cat, e) => {
//     { console.log("ggg", e.target.checked, name, cat); }
//     let array = accordiontabless
//     let hari = array.map((list) => {
//         if (list.cat == cat) {
//             list.filters.map((names, i) => {
//                 if (names.name == name) {
//                     list.filters[i].checked = e.target.checked
//                     if (e.target.checked == true) {
//                         setSelfilter([...selfilter, { ...list.filters[i], cat: list.cat }])
//                     }
//                 }
//             })
//             return list
//         }
//         else {
//             return list
//         }
//     }

//     )
//     setAccordiontabless(hari)
// }
const params = useParams()
const [filter , setfilter ] = useState({})
const [id , setid ] = useState("")

console.log("CategorysCategorys" , Categorys?.subcategorylist , params.symbol)
const [subcategory, setSubcategory] = useState(Categorys?.subcategorylist?.filter((data) => data.category === params?.symbol));
const changcat = (id , event)=>{
let array = [];
console.log("sghduyagsduy" , event.target.value)
setid(id)
for(let i = 0;  i < Categorys?.subcategorylist.length ; i++){
if(Categorys?.subcategorylist[i].Classid === id){
    array.push(Categorys?.subcategorylist[i])
}
}
setSubcategory(array)
console.log("sghduyagszzzduy" , array)
}
const [tag , setTag] = useState('USD')
const pricerangeinit = {
    type : tag , 
    min : Math.min(), 
    max : Math.max()
}
const [pricerange, setpricerange] = useState(pricerangeinit)
const range = (e) => {
    const {id , value} = e.target
    setpricerange({...pricerange , [id] : value})
    seterror({})
}
const [errossr , seterror] =useState({}) 
const error = {}
function pricefilter(){

if(Number(pricerange?.min) >= Number(pricerange?.max) ){
    error.price = "min should be less than max"
    seterror(error)
    return 
} 
console.log("pricerangeerror" , pricerange ,error )

props.explore({ pricerange : pricerange , status : true})
}

let regex = /^[0-9]+$/;



    return (
        <div>


            <Accordion defaultActiveKey="01">
                <Accordion.Item eventKey="01">
                    <Accordion.Header><h4 className="heading mb-0">Price</h4></Accordion.Header>
                    <Accordion.Body>
                        <Dropdown>
                            <DropdownToggle className="pricefilter">{tag}</DropdownToggle>
                            {/* <DropdownMenu>
                                <DropdownItem onClick={()=> setTag('BNB')}>BNB</DropdownItem>
                                <DropdownItem onClick={()=> setTag('MATIC')} >MATIC</DropdownItem>
                            </DropdownMenu> */}
                        </Dropdown>
                        <div className="d-flex align-items-center pt-4">
                            <input type="Number" className="form-control profinput" placeholder="Min" id ="min" 
                            onChange={range} />
                            <h5 className="whtsclr mx-3 mb-0">to</h5>
                            <input type="Number" className="form-control profinput" placeholder="Max" id ="max" onChange={range} />
                        </div>
                        { errossr.price &&  <p className="text-danger">{errossr.price}</p>}
                        <div className="text-center mt-4 mb-3"><Button className="explorefull" onClick={() => {
pricefilter()
                           }}>APPLY</Button></div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <h4 className="heading ps-2 mb-0">traits</h4>
            


            <Accordion defaultActiveKey={1}>
{/* 
            <Accordion.Item eventKey={1}>
                        <Accordion.Header onClick={() => props.toggleAccordion(1)}><h4 className="whtsclr fw-300 mb-0">{"Class"}</h4> <p className="grayclr posl">{Categorys?.class?.length ?Categorys?.class?.length : 0  }</p></Accordion.Header>
                        <Accordion.Body>
                         
                            
                            {Categorys?.class?.map((val, i) =>
                                <div className="d-flex align-items-center justify-content-between pt-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(event) => { 
                                                   changcat(val._id , event);
                                                   props.Tabchange(val._id)
                                            props.handlechange( val._id ); 
                                        }
                             
                                    }checked={id === val._id} />
                                        {console.log("dshdsgd" , val.checked)}
                                        <label class="form-check-label whtsclr fw-200 f-20 ms-2" for="flexCheckDefault">
                                            {val.name}
                                        </label>
                                    </div>
                                    <p className="grayclr mb-0">{val.num}</p>
                                </div>
                            )}
                        </Accordion.Body>
                    </Accordion.Item> */}

                {(!isEmpty(subcategory)) && subcategory?.map((e, i) =>
                    <Accordion.Item eventKey={i + 2}>
                        <Accordion.Header onClick={() => props.toggleAccordion(i + 2)}><h4 className="whtsclr fw-300 mb-0">{e.key}</h4> <p className="grayclr posl">{e.value.length ? e.value.length  : 0 }</p></Accordion.Header>
                        <Accordion.Body>
                            <input type="search" className="form-control profinput mb-2" placeholder="Search" onChange={(event) => {
                                console.log(e , event.target.value)
                                const filteredData = {
                                    ...e,
                                    [e.key]: e.value.filter(item => item.value.includes(event.target.value))
                                  };
                                  console.log("filteredData",filteredData , filter[e.key])
                                  e = filteredData
                                  setfilter(filteredData)
                            }} />
                            { (!isEmpty(filter[e.key])) ? filter[e.key]?.map((val, i) =>
                                <div className="d-flex align-items-center justify-content-between pt-3">
                                    <div class="form-check">
                                        {console.log("dshdsgzd" , e)}
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(event) => props.handlechange( e.Classid , { [e?.key] : val?.value }  ,event) } checked={val.checked} />
                                        <label class="form-check-label whtsclr fw-200 f-20 ms-2" for="flexCheckDefault">
                                            {val.value}
                                        </label>
                                    </div>
                                    {/* <p className="grayclr mb-0">{val.value}</p> */}
                                </div>
                            ) : e.value.map((val, i) =>
                            <div className="d-flex align-items-center justify-content-between pt-3">
                                <div class="form-check">
                                    {console.log("dshdsgzd" , e)}
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(event) => props.handlechange( e.Classid , { [e?.key] : val?.value }  ,event) } checked={val.checked} />
                                    <label class="form-check-label whtsclr fw-200 f-20 ms-2" for="flexCheckDefault">
                                        {val.value}
                                    </label>
                                </div>
                                {/* <p className="grayclr mb-0">{val.value}</p> */}
                            </div>
                        )
                        
                        
                        }
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>


            {/* <Accordion defaultActiveKey={1}>
                {props.list.map((e, i) =>
                    <Accordion.Item eventKey={i + 1}>
                        <Accordion.Header onClick={() => props.toggleAccordion(i + 1)}><h4 className="whtsclr fw-300 mb-0">{e.cat}</h4> <p className="grayclr posl">{e.no}</p></Accordion.Header>
                        <Accordion.Body>
                            <input type="search" className="form-control profinput mb-2" placeholder="Search" />
                            {e.filters.map((val, i) =>
                                <div className="d-flex align-items-center justify-content-between pt-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(event) => props.handlechange(val.name, e.cat, event)} checked={val.checked} />
                                        <label class="form-check-label whtsclr fw-200 f-20 ms-2" for="flexCheckDefault">
                                            {val.name}
                                        </label>
                                    </div>
                                    <p className="grayclr mb-0">{val.num}</p>
                                </div>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion> */}





        </div>
    )
}

export default Filterlist