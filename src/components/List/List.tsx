import './List.scss';
import { AutoSizer, Grid } from 'react-virtualized';

interface ListProps {
    // array of emojis
    emojis: string[],
    // onClick handler
    copyEmoji: Function,
    // row count in grid
    rowCount: number,
    // column count in grid
    columnCount: number
}

export function List({ emojis, rowCount, columnCount, copyEmoji }: ListProps) {
    return (
        emojis.length
            ? <div className="list-wrappper" style={{ position: 'relative', height: 'calc(100% - 7rem)' }}>
                {
                    <AutoSizer>
                        {({ width, height }) => (
                            <Grid
                                cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                                    const emoji = emojis[rowIndex * columnCount + columnIndex];
                                    return <div className={'list__item'} key={key} style={style} onClick={() => copyEmoji(emoji)}>
                                        {emoji}
                                    </div>
                                }
                                }
                                className={'list'}
                                columnWidth={width / columnCount}
                                columnCount={columnCount}
                                height={height}
                                overscanColumnCount={0}
                                overscanRowCount={0}
                                rowHeight={50}
                                rowCount={rowCount}
                                width={width}
                            />
                        )}
                    </AutoSizer>
                }
            </div>
            : <div className="list--emojis-note">
                <h1>😔</h1>
                <p>Nothing...</p>
            </div>
    )
}