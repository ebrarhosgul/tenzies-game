export default function(props) {
    return (
        <button
            className={`die-box ${props.isHeld ? "helded" : ""}`}
            onClick={props.holdDie}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >
            {props.value}
        </button>
    )
}