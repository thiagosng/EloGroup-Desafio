import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import uuid from "uuid/v4";

const NewLeadPage = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [allChecked, setAllChecked] = useState(false);
    const [rpa, setRpa] = useState(false);
    const [produtoDigital, setProdutoDigital] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [bpm, setBpm] = useState(false);

    const history = useHistory();

    console.log(name, email, phone, allChecked, rpa, produtoDigital, analytics, bpm);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, phone);
        const oldLeads = localStorage.getItem('lead')
        if(oldLeads === null) {
           localStorage.setItem('lead', JSON.stringify([{ id: uuid(), name, email, phone,  rpa, produtoDigital, analytics, bpm }]));
           history.push('/painel');
        }else{
            const lead = [...JSON.parse(oldLeads), { id: uuid(), name, email, phone, rpa, produtoDigital, analytics, bpm }];
            localStorage.setItem('lead', JSON.stringify(lead));
            history.push('/painel');
            console.log(lead);
        }
    }

    const allSelected = () => {
        if(allChecked === false) {
            setAllChecked(true);
            setRpa(true);
            setProdutoDigital(true);
            setAnalytics(true);
            setBpm(true);
        } else {
            setAllChecked(false);
            setRpa(false);
            setProdutoDigital(false);
            setAnalytics(false);
            setBpm(false);
        }
    }


    return (
       
            <div className="container">
                <div>
                    <img src="https://elogroup.com.br/wp-content/uploads/2021/08/Logo-2.svg" alt="logo-elo" />
                    <form className="row" onSubmit={(e)=> handleSubmit(e)}>
                        <div className="col-sm">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required="required" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required="required" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                                title="O DDD precisa está presente, além disso, não deve haver espaços entre os números"pattern="[0-9]{2}[9][0-9]{4}[0-9]{4}"required="required"
                                />
                            </div>
                        </div>
                        <div className="col-sm m-4">
                        <table className="toCheck">
                        <div className="checkbox">
                            <tr>
                                <label>
                                    <input type="checkbox" name="allChecked" onChange={()=>allSelected()} checked={allChecked} />
                                    All
                                </label>
                            </tr>
                        </div>
                        <div className="checkbox">
                            <tr>
                                <label>
                                    <input type="checkbox" name="rpa" onChange={()=>setRpa(!rpa)} checked={rpa} />
                                    RPA
                                </label>
                            </tr>
                        </div>
                        <div className="checkbox">
                            <tr>
                            <label>
                                <input type="checkbox" name="produtoDigital" onChange={()=>setProdutoDigital(!produtoDigital)} checked={produtoDigital} />
                                Produto Digital
                            </label>
                            </tr>
                        </div>
                        <div className="checkbox">
                        <tr>
                            <label>
                                <input type="checkbox" name="analytics" onChange={()=>setAnalytics(!analytics)} checked={analytics} />
                                Analytics
                            </label>
                        </tr>
                        </div>
                        <div className="checkbox">
                        <tr>
                            <label>
                                <input type="checkbox" name="bpm" onChange={()=>setBpm(!bpm)} checked={bpm} />
                                BPM
                            </label>
                        </tr>
                        </div>
                        </ table>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export {NewLeadPage};