import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    }
}));

interface PaginationProps {
    count: number,
    curPage:number,
    callback:(event:any,value:any)=>void
    disabled:boolean
}

const ChartPagination: React.FC<PaginationProps> = ( {callback,count,curPage,disabled}) => {
    const classes = useStyles();
    return (
         <div className={classes.root}>
            <Pagination count={count} page={curPage} onChange={callback} disabled={disabled}  size="small"/>
        </div>
    );
};

export default ChartPagination;
