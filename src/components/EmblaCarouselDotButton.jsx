import  { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

export const DotButton = ({ selected, onClick }) => (
    <button
        className={`embla__dot ${selected ? 'is-selected' : ''}`}
        type="button"
        onClick={onClick}
    />
)

DotButton.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func
}

export const useDotButton = (emblaApi) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])

    const onDotButtonClick = useCallback(
        (index) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    const onInit = useCallback((emblaApi) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
} 