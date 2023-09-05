import React from 'react'

function Rating({value, text, color}) {
  return (
    <div className="rating">
        <span>
            <i style={{ color }} className={
                value >= 1 
                    ? 'fas fa-star' //se il valore è piu grande di 1 allora assegno un stella
                    : value >= 0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

            }>
            </i>
        </span>

        <span>
            <i style={{ color }} className={
                value >= 2 
                    ? 'fas fa-star' //se il valore è piu grande di 1 allora assegno un stella
                    : value >= 1.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

            }>
            </i>
        </span>

        <span>
            <i style={{ color }} className={
                value >= 3
                    ? 'fas fa-star' //se il valore è piu grande di 1 allora assegno un stella
                    : value >= 2.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

            }>
            </i>
        </span>

        <span>
            <i style={{ color }} className={
                value >= 4 
                    ? 'fas fa-star' //se il valore è piu grande di 1 allora assegno un stella
                    : value >= 3.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

            }>
            </i>
        </span>

        <span>
            <i style={{ color }} className={
                value >= 5 
                    ? 'fas fa-star' //se il valore è piu grande di 1 allora assegno un stella
                    : value >= 4.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

            }>
            </i>
        </span>
    {/* nel caso text esista && */}
       <span>{text && text}</span>
    </div>
  )
}

export default Rating 