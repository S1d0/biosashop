import {cn} from '@/lib/utils'

export default function ProductPrice({value, className}: { value: number, className?: string }) {
    const plnValue= value/100;
    const [intVal, floatVal] = plnValue.toFixed(2).toString().split(".");
    return (
        <div className={cn('font-medium text-2xl', className)}>
            <span>{intVal}</span>
            <span className={"text-xs align-super"}>{floatVal}</span>
            <span className={"pl-1"}>zł</span>
        </div>
    )
}