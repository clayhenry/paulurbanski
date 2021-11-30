
export const Image = ({url, color, onDosomething, data}) => {

    return (
        <div style={{color: color}}>
            {url}

          { data.map((d)=>
              <div onClick= {()=>onDosomething(d.id)} key={d.id}>{d.title['rendered']}</div>
            )
            }
        </div>
    )   
}

Image.defaultProps = {
    url : "some defaukt url"
}
export default Image