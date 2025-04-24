import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import PropTypes from 'prop-types'
import { TrendProducts } from '../data'

const MasterArtGaming = (props) => {
    const { options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
  
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
      useDotButton(emblaApi)
  
    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
    } = usePrevNextButtons(emblaApi)
  

    return (
        <section className="embla" dir="rtl">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {TrendProducts.map((index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number">{index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

MasterArtGaming.propTypes = {
    options: PropTypes.object
}

export default MasterArtGaming
