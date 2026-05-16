// const element = <h1 title="foo">Hello</h1>
// const element = {
//   type: "h1",
//   props: {
//     title: "foo",
//     children: "Hello",
//   },
// };
// const container = document.getElementById("root");
// ReactDOM.render(element, container)
// const node = document.createElement(element.type);
// node["title"] = element.props.title;

// const text = document.createTextNode("");
// text["nodeValue"] = element.props.children;

// node.appendChild(text);
// container.appendChild(node);



//step 1: createElement 
function createElement(type,props, ...children){
  return {
    type,
    props:{
      ...props,
      children:children.map((child)=>{
        if(typeof child === "object"){
          return child;
        }
        return createTextElement(child);
      }),
    }
  }
}
function createTextElement(text){
  return {
    type:"TEXT_ELEMENT",
    props:{
      nodeValue:text,
      children:[],
    }
  }
}
function render(element, container){  
  const dom = element.type == "TEXT_ELEMENT"?document.createTextNode(""):document.createElement(element.type);
  const isProperty = (key)=>key !== "children";
  Object.keys(element.props).filter(isProperty).forEach((name)=>{
    dom[name] = element.props[name];
  })
  element.props.children.forEach((child)=>{
    render(child, dom);
  })
  container.appendChild(dom);
}
const Didact ={
  createElement,
  render
}
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
const container = document.getElementById("root");
Didact.render(element, container);