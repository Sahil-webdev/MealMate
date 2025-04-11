import React from 'react'
import aboutimg from "../assets/aboutusimg.jpeg"
import img2 from "../assets/aboutusimg2.jpg"
import img3 from "../assets/about2.jpg"
import style from "./Aboutus.module.css"

const Aboutus = () => {
  return (
    <div>
      <div className='rounded-2xl'>
        <img className={`rounded-2xl ${style.mainImg}`} src={aboutimg} alt="" />
      </div>

      <div className='my-10 flex flex-col md:!flex-row gap-16'>
        <img className='w-full h-[500px] md:!max-w-[400px] rounded-2xl' src={img2} alt="about-img" />
        <div className='flex flex-col justify-center gap-6 md:!w-2/4'>
          <p>Let’s be honest — sharing food is easy. Splitting the bill? Not so much.</p>
          <p>That’s where Mealmates comes in.</p>
          <p>We’re a team of four friends who know the pain of “Who paid last time?” debates and “I’ll pay you later” promises that never see the light of day. So, we created Mealmates — a smart, simple, and slightly cheeky way to split meal payments without breaking a sweat (or a friendship).</p>
          <p>Our platform is designed for college students, teenagers, and anyone who loves food but also wants to keep their budget — and their friendships — intact. With our unique split payment feature, we make sure everyone pays their fair share — even that one friend who always disappears when the bill arrives.</p>
        </div>
      </div>

      <div className='my-10 flex flex-col md:!flex-row gap-16'>
        <div className='flex flex-col justify-center gap-6 md:!w-2/4'>
          <b className='text-gray-800'>Our Mission</b>
          <p>To make splitting payments with your crew so easy that even the friend who never pays on time has no excuse now. Whether you’re grabbing coffee, sharing a pizza, or cooking up some midnight Maggi — Mealmates has your back (and your bill).</p>
          <p>We’re not a big company with suits and jargon. We’re just four buddies with an idea, a lot of late-night food memories, and one shared goal — to make group meals more fun and less financially awkward.</p>
          <p>So grab your gang, order what you love, and let Mealmates handle the math.</p>
          <p><b>You eat. We split.</b></p>
        </div>
        <img className='w-full h-[500px] md:!max-w-[400px] rounded-2xl' src={img3} alt="about-img" />
      </div>

    </div>
  )
}

export default Aboutus