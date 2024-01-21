export default function MikanCurrency(props) {
    return (
            <div className="
                      flex
                      flex-row
                      justify-center
                      self-center
                      p-1
                      border-4
                      bg-amber-200
                      border-amber-200
                      box-border
                      rounded-2xl
                      drop-shadow-md">
                <span className="text-md">
                    みかん通貨
                </span>
                <p className="pl-2
                text-2xl
                ">
                    <a>{props.currencyAmount}</a>
                    <span className="text-sm p-0.5">mp</span>
                </p>
            </div>
    )
}