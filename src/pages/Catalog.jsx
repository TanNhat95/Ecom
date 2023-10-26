import React, { useState , useEffect ,useCallback, useRef } from 'react'
import Title from '../components/Title.jsx'
import CheckBox from '../components/CheckBox.jsx'
import Button from '../components/Button.jsx'
import InfinityList from '../components/InfinityList.jsx'
import productData from '../assets/fake-data/products.js'
import axios from 'axios'
const Catalog =  () => {
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [categories, colors, sizes] = await Promise.all([
          axios.get('http://localhost:8080/api/categories'),
          axios.get('http://localhost:8080/api/colors'),
          axios.get('http://localhost:8080/api/sizes')
        ])
        setCategories(categories.data)
        setSizes(sizes.data)
        setColors(colors.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails()
  }, [])

  //initState
  const initFilter = {
    category: categories,
    color: colors,
    size: sizes,
  }

  const productList = productData.getAllProducts();
  const [products,setProducts] = useState(productList);


  //useState

  const [filter,setFilter] = useState(initFilter);

  const filterRef = useRef(null);

 const showHideFilter = () => filterRef.current.classList.toggle('active')

  //handle

  const filterSelect = (type,checked,item) =>{
    if(checked){
      switch(type){
        case "CATEGORY" :
          setFilter({...filter,category:[...filter.category,item.categorySlug]})
          break;
        case "COLOR" :
          setFilter({...filter,color:[...filter.color,item.color]})
          break;
        case "SIZE" :
          setFilter({...filter,size:[...filter.size,item.size]})
          break;
        default:
      }
    }else{
      switch(type){
        case "CATEGORY" :
          const newCategory = filter.category.filter(e=>e !== item.categorySlug)
          setFilter({...filter,category: newCategory})
          break;
        case "COLOR" :
          const newColor = filter.color.filter(e=>e !== item.color)
          setFilter({...filter,color: newColor})
          break;
        case "SIZE" :
          const newSize = filter.size.filter(e=>e !== item.size)
          setFilter({...filter,size: newSize})
          break;
        default:
    }
  }
}

  const updateProducts = useCallback(() =>{
    let temp = productList;
    if(filter.category.length>0){
      temp = temp.filter(e=>filter.category.includes(e.categorySlug))
    }

    if(filter.color.length>0){
      temp = temp.filter(e=>{
            const check = e.colors.find(color=>filter.color.includes(color))
            return check!==undefined
          })
    }

    if(filter.size.length>0){
      temp = temp.filter(e=>{
            const check = e.size.find(size=>filter.size.includes(size))
            return check!==undefined
          })
    }

    setProducts(temp);
  },[filter,productList],
  )

  useEffect(() => {
    updateProducts()
  }, [updateProducts])


  const clearFilter = () =>{
    setFilter(initFilter);
  }



  return (
    <Title title='Sản phẩm'>
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className="catalog__filter__close" onClick={()=>showHideFilter()}>
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget-title">
              Danh sách sản phẩm
            </div>
            <div className="catalog__filter__widget-content">
              {
                categories.map((item,index)=>(
                  <div className='catalog__filter__widget-content-item' key={index}>
                    <CheckBox
                      label={item.display}
                      onChange = {(input)=>filterSelect("CATEGORY",input.checked,item)}
                      checked={filter.category.includes(item.categorySlug)}
                    />
                  </div>
                ))
              }
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget-title">
              Danh sách màu sắc
            </div>
            <div className="catalog__filter__widget-content">
              {
                colors.map((item,index)=>(
                  <div className='catalog__filter__widget-content-item' key={index}>
                    <CheckBox
                      label={item.display}
                      onChange = {(input)=>filterSelect("COLOR",input.checked,item)}
                      checked={filter.color.includes(item.color)}
                    />
                  </div>
                ))
              }
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget-title">
              Danh sách kích cỡ
            </div>
            <div className="catalog__filter__widget-content">
              {
                sizes.map((item,index)=>(
                  <div className='catalog__filter__widget-content-item' key={index}>
                    <CheckBox
                      label={item.display}
                      onChange = {(input)=>filterSelect("SIZE",input.checked,item)}
                      checked={filter.size.includes(item.size)}
                    />
                  </div>
                ))
              }
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter-content">
              <Button size='sm' onclickMode={clearFilter}>Xóa bộ lọc</Button>
            </div>
          </div>

        </div>
        <div className="catalog__filter__toggle">
          <Button size='sm' backgroundColor='pink' onclickMode={showHideFilter}>Lọc sản phẩm</Button>
        </div>

        <div className="catalog__content">
          <InfinityList
            data={products}
          />
        </div>
      </div>
    </Title>
  )
}

export default Catalog