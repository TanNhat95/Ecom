import React ,{useEffect} from 'react'
import { useParams } from 'react-router-dom'

import Title from '../components/Title.jsx'
import Grid from '../components/Grid.jsx'
import Section , {SectionBody,SectionTitle} from '../components/Section.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductViews from '../components/ProductViews.jsx'


import productData from '../assets/fake-data/products.js'

const Product = props => {
  let {slug} = useParams();

  const product = productData.getProductBySlug(slug);
  const relatedProducts = productData.getProducts(8);

  useEffect(() => {
    window.scrollTo(0,0)
  }, [product])
  

  return (
    <Title title={product.title}>
      <Section>
        <SectionBody>
          <ProductViews product={product}/>
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle>
          Sản phẩm liên quan
        </SectionTitle>
        <SectionBody>
        <Grid
          col={4}
          mdcol={2}
          smcol={1}
          gap={20}
        >
          {
            relatedProducts.map((item,index)=>(
              
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price= {Number(item.price)}
                slug={item.slug}
              >
                
              </ProductCard>
            ))
          }

        </Grid>
        </SectionBody>
      </Section>
    </Title>
  )
}

export default Product