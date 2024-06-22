import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { useNavigate } from 'react-router-dom'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.https://th.bing.com/th/id/R.6a80b4c557ca76a473ff15118da42cb0?rik=X9VdkWQ73A0x6g&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f9%2f95%2fSan_Francisco_Oakland_Bay_Bridge_at_night.jpg&ehk=q%2bZ7iHmY6y4P1SbV4qXR%2fHYVZUAbNRM5LPu%2bVX5%2bQ7s%3d&risl=&pid=ImgRaw&r=0.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Nelore',
    imgPath:
      'https://images.https://th.https://https://th.bing.com/th/id/OIP.kfaqIJ-Iw7t4hai1hnLfpAHaFj?rs=1&pid=ImgDetMain.bing.com/th/id/OIP.kfaqIJ-Iw7t4hai1hnLfpAHaFj?rs=1&pid=ImgDetMain.com/th/id/R.45f5717c4f345151a7faf3047c602341?rik=VugIRlxNuNbioQ&pid=ImgRaw&r=0.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.https://th.bing.com/th/id/OIP.-ceHr06YG7obxqFaVfzvVwHaE8?rs=1&pid=ImgDetMain.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250'
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-https://th.bing.com/th/id/OIP.HnhQyoHK_sEKMEG7eLTEgAHaEG?rs=1&pid=ImgDetMain-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
  }
]

export function VotesCarousel() {
  const navigate = useNavigate()

  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = images.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  function handleClickListForm() {
    navigate('/')
  }

  return (
    <>
      <button onClick={handleClickListForm}>Formato Lista</button>
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default'
          }}
        >
          <Typography>{images[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%'
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </Box>
    </>
  )
}
