import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function App() {
  const [service, setService] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [miles, setMiles] = useState(0);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [total, setTotal] = useState(null);
  const [quotes, setQuotes] = useState([]);

  const calculateQuote = () => {
    let base = 0;
    let perMile = 0;
    let fuel = 0;

    if (service === 'Towing') {
      if (vehicle === 'Light Duty') {
        base = 125;
        perMile = 8;
      } else if (vehicle === 'Heavy Duty') {
        base = 1500;
        perMile = 15;
      }
    } else if (service === 'Jumpstart' || service === 'Lockout') {
      if (vehicle === 'Light Duty') base = time === 'Before 12 Noon' ? 150 : 180;
      else base = time === 'Before 12 Noon' ? 250 : 275;
    } else if (service === 'Tire Change') {
      if (vehicle === 'Light Duty') base = time === 'Before 12 Noon' ? 160 : 190;
      else base = time === 'Before 12 Noon' ? 250 : 350;
    } else if (service === 'Tire Inflation') {
      base = vehicle === 'Light Duty' ? 175 : 275;
    } else if (service === 'Tire Replacement') {
      base = vehicle === 'Light Duty' ? 350 : 750;
    }

    if (location === 'Normal') fuel = 20;
    else if (location === 'Bad') fuel = 50;
    else if (location === 'Far') fuel = vehicle === 'Light Duty' ? 150 : 300;

    const totalQuote = base + miles * perMile + fuel;
    setTotal(totalQuote);
  };

  const saveQuote = () => {
    if (!service || !vehicle || total === null) return;
    const newQuote = {
      id: Date.now(),
      service,
      vehicle,
      miles,
      time,
      location,
      total,
    };
    setQuotes([newQuote, ...quotes]);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">ResQXpress Quote Calculator</h1>

        <div className="form-row">
          <label>Service Type</label>
          <select value={service} onChange={(e)=>setService(e.target.value)}>
            <option value="">Select...</option>
            <option value="Towing">Towing</option>
            <option value="Jumpstart">Jumpstart</option>
            <option value="Lockout">Lockout</option>
            <option value="Tire Change">Tire Change</option>
            <option value="Tire Inflation">Tire Inflation</option>
            <option value="Tire Replacement">Tire Replacement</option>
          </select>
        </div>

        <div className="form-row">
          <label>Vehicle Type</label>
          <select value={vehicle} onChange={(e)=>setVehicle(e.target.value)}>
            <option value="">Select...</option>
            <option value="Light Duty">Light Duty</option>
            <option value="Heavy Duty">Heavy Duty</option>
          </select>
        </div>

        {service === 'Towing' && (
          <div className="form-row">
            <label>Miles</label>
            <input type="number" value={miles} onChange={(e)=>setMiles(Number(e.target.value))} />
          </div>
        )}

        <div className="form-row">
          <label>Time of Day</label>
          <select value={time} onChange={(e)=>setTime(e.target.value)}>
            <option value="">Select...</option>
            <option>Before 12 Noon</option>
            <option>After 2 PM</option>
          </select>
        </div>

        <div className="form-row">
          <label>Location</label>
          <select value={location} onChange={(e)=>setLocation(e.target.value)}>
            <option value="">Select...</option>
            <option>Normal</option>
            <option>Bad</option>
            <option>Far</option>
          </select>
        </div>

        <div className="buttons">
          <button onClick={calculateQuote}>Calculate Quote</button>
          <button onClick={saveQuote} className="secondary">Save Quote</button>
        </div>

        {total !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="result">
            <div className="result-title">Estimated Quote</div>
            <div className="result-amount">${total.toFixed(2)}</div>
          </motion.div>
        )}
      </div>

      {quotes.length > 0 && (
        <div className="card summary">
          <h2>Saved Quotes</h2>
          <table>
            <thead>
              <tr>
                <th>Service</th><th>Vehicle</th><th>Miles</th><th>Location</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q=>(
                <tr key={q.id}>
                  <td>{q.service}</td>
                  <td>{q.vehicle}</td>
                  <td>{q.miles}</td>
                  <td>{q.location}</td>
                  <td>${q.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
