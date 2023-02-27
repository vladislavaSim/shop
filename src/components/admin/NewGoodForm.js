import React, {useState} from 'react';
import {MenuItem, TextField} from "@mui/material";
import {connect, useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {actionGoodUpsert} from "../../redux/actions/adminActions";

const NewGoodForm = ({promise, addNewGood, allCats}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')


const dispatch = useDispatch()

    console.log(promise)
    return (
        <div className='admin-form'>
            <TextField
                required
                id="outlined-required"
                label="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <TextField
                required
                multiline={true}
                id="outlined-required"
                label="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            <TextField
                required
                id="outlined-required"
                label="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            <TextField
                // id="outlined-select-currency"
                select
                label="category"
                defaultValue="Smartphone"
                helperText="Please select the category"
                onChange={(e) => setCategory(e.target.value)}
            >
                {allCats.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>
                        {cat.name}
                    </MenuItem>
                ))}
            </TextField>
            <Button
                variant="contained"
                color='success'
                onClick={() => addNewGood({
                    name, description, price: Number(price), categories: {
                        name: category
                    }
                })}>
                Add
            </Button>
        </div>
    );
};

export const CNewGoodForm = connect((state) => ({
    promise: state?.promise,
    allCats: state?.promise?.allCats?.payload
}), {
    addNewGood: actionGoodUpsert
})(NewGoodForm);