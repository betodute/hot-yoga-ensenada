import './Quote.css'

let quotes = {
  quote1: {
    content: "Quiero aprender de mí mismo, deseo ser mi discípulo, conocerme.",
    citation: "de la obra Siddhartha de Hermann Hesse" 
  },
  quote2: {
    content: "Lo mismo que al árbol. Cuanto más quiere elevarse hacia la altura y hacia la luz, tanto más fuertemente tienden sus raíces hacia la tierra, hacia abajo, hacia lo oscuro, lo profundo, - hacia el mal",
    citation: "de la obra Así Hablo Zaratustra de Nietzsche"
  },
  quote3: {
    content: "omaiga",
    citation: "by omaiga"
  }
}

let randomNum = Math.ceil(Math.random() * 3);


export const Quote = () => {

  if (randomNum === 1) {
    return (
      <div className="quote-wrapper">
        <h3 className="quote"> {quotes.quote1.content} </h3>
        <h5 className="quote-author"> {quotes.quote1.citation} </h5>
      </div>
    )
  };

  if (randomNum === 2) {
    return (
      <div className="quote-wrapper">
        <h3 className="quote"> {quotes.quote2.content} </h3>
        <h5 className="quote-author"> {quotes.quote2.citation} </h5>
      </div>
    )
  };

  if (randomNum === 3) {
    return (
      <div className="quote-wrapper">
        <h3 className="quote"> {quotes.quote3.content} </h3>
        <h5 className="quote-author"> {quotes.quote3.citation} </h5>
      </div>
    )
  }


}