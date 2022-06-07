import { GetStaticProps } from 'next'

import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './Home.module.scss'


interface HomeProps {
  product: {
    priceId:String;
    amount: number
  }
}

export default function Home({product}:HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏Hey, Welcome</span>
          <h1>News about the <span>React</span>World</h1>
          <p>  Get access to all the publications <br/>
            <span>for {product.amount} month</span></p>
            <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding"/>
      </main>
     
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  //executada no servidor node 
  const price = await stripe.prices.retrieve('price_1L5yZHJ8IQRYwWSixvidhm1Y')
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', { //formatação
      style: 'currency',
      currency:'USD'
    }).format(price.unit_amount/100),
    
  }
  return {
    props: {
      product
    },
    //quanto tempo (em segundos) a pagina precisará ser revalidada
    revalidate: 60 + 60 + 24, //24 hours
  }
}