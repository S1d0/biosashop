import {cn} from '@/lib/utils'

export default function ProductPrice({value, className}: { value: number, className?: string }) {
    const plnValue= value/100;
    const [intVal, floatVal] = plnValue.toFixed(2).toString().split(".");
    return (
        <p className={cn('text-2xl', className)}>
            <span>{intVal}</span>
            <span className={"text-xs align-super"}>{floatVal}</span>
            <span className={"text-xl pl-1"}>zł</span>
        </p>
    )
}