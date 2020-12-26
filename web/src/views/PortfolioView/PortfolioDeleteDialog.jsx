import React from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, Dialog, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';

const PortfolioDeleteDialog = ({ open, handleClose, portfolioId }) => {
    const dispatch = useDispatch();
    const userPortfolios = useSelector(state=>state.portfolio.data);

    const [ deleting, setDeleting ] = useState(false); 
    const [ deletePortfolioName, setDeletePortfolioName ] = useState("");

    const deletePortfolio = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        setDeleting(true);
        fetch(`/api/portfolio/${portfolioId}`, requestOptions)
            .then((res) => {
                setDeleting(false);
                handleClose();
                dispatch(portfolioAction.getPortfolios());
            }).catch((err)=>{
                setDeleting(false);
            })
    };

    useEffect(()=>{
        let filteredPortfolios = userPortfolios.filter((userPortfolio)=>userPortfolio.portfolioId===portfolioId);
        if(filteredPortfolios.length>0){
            setDeletePortfolioName(filteredPortfolios[0].portfolioName);
        }
    }, [ portfolioId, userPortfolios ])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>刪除</DialogTitle>
            <DialogContent>
                確定刪除 {deletePortfolioName} ?
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={deleting} onClick={deletePortfolio}>
                    {deleting && <CircularProgress size={24} />}
                    確定
                </Button>
                <Button color="secondary" disabled={deleting} onClick={handleClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PortfolioDeleteDialog;