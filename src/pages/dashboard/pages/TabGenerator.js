import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import { Card, CardBody } from '@windmill/react-ui'
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Button } from '@windmill/react-ui'

function TabGenerator() {
  return (
    <>
          <PageTitle>Tab Generator</PageTitle>

     <h1 className='text-center text-6xl pt-7 text-green-400'>Tab Generator Is Working Fine</h1>
     <h1 className='text-center text-6xl pt-7 text-green-400'>Last Auto Check (1h ago)</h1>
<p className='text-center text-2xl pt-10'>
    Our AI will check the target website every 3 hours and update the information for you.
    If anything goes wrong feel free to contact the developer for a quick fix  !!
</p>
    
<Button size="large" className='mt-20'>Manual check</Button>


    </>
  )
}

export default TabGenerator
