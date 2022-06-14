import React from 'react'
import Title from '../components/Title.jsx'
import HeroSlide from '../components/HeroSlide.jsx'
import heroSlideData from '../assets/fake-data/hero-slider.js'
import Section,{SectionBody,SectionTitle} from '../components/Section.jsx'
import PolicyCard from '../components/PolicyCard.jsx'
import policy from '../assets/fake-data/policy.js'
import productData from '../assets/fake-data/products.js'
import banner from '../assets/images/banner.png'
import Grid from '../components/Grid.jsx'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllUser } from '../redux/apiRequest.js'

const Home = () => {

  const user = useSelector(state=>state.authen.login?.currentUser);

  const dispatch = useDispatch();
  useEffect(() => {
    getAllUser(user?.accessToken,dispatch);
  }, [user])
  
  return (
    
    <Title title='Trang chủ'>
      {/* Hero slide */}
      <HeroSlide 
        data={heroSlideData}
        control={true}
        auto={true}
        timeOut={5000}
      />
      

      {/* end Hero */}

      {/* section-policy */}

        <Section>
          <SectionBody>
            <Grid
              col={4}
              mdcol={2}
              smcol={1}
              gap={20}
            >
              {
                policy.map((item,index)=>(
                  <Link to="/policy" key={index}>
                    <PolicyCard  
                      name={item.name}
                      icon={item.icon}
                      description={item.description}
                    />
                  </Link>
                ))
              }
            </Grid>
            
          </SectionBody>
        </Section>

      {/* end section-policy */}

      {/* product-card-best-seller */}

        <Section>
          <SectionTitle>
            Những sản phẩm bán siêu chạy trong tuần
          </SectionTitle>
          <SectionBody>
            <Grid
                col={4}
                mdcol={2}
                smcol={1}
                gap={20}
              >
                {
                  productData.getProducts(4).map((item,index)=>(
                    
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

      {/* end product-card-best-seller */}

      {/* bonus-product */}
        
      <Section>
          <SectionTitle>
            Sản phẩm mùa đông sắp ra mắt
          </SectionTitle>
          <SectionBody>
            <Grid
                col={4}
                mdcol={2}
                smcol={1}
                gap={20}
              >
                {
                  productData.getProducts(4).map((item,index)=>(
                    
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
        

      {/* end bonus-product */}

      {/* banner */}
        <Section>
          <SectionBody>
            <Link to='/catalog'>
              <img src={banner} alt="" />
            </Link>
          </SectionBody>
        </Section>
      {/* end banner */}

      {/* hottrend */}
      <Section>
          <SectionTitle>
            Sản phẩm Hot Trend
          </SectionTitle>
          <SectionBody>
            <Grid
                col={4}
                mdcol={2}
                smcol={1}
                gap={20}
              >
                {
                  productData.getProducts(8).map((item,index)=>(
                    
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
      {/* hottrend */}
    </Title>
  )
}

export default Home
