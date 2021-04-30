import './App.css';
import React, {useEffect, useState} from 'react';

const API_HOST = "http://localhost:5000";

function App() {	
	const [data, setData] = useState([]);

    // GET request function to Flask API
    const fetchItem= () => {
        fetch(`${API_HOST}/api/item/query-all`)
            .then(response => response.json())
            .then(json => setData(json));
    }
    
    // Calling the function on component mount
    useEffect(() => {
        fetchItem();
    }, []);
	
	function showFormItemCreate() {
		document.getElementById("overlay").style.visibility = 'visible';
		document.getElementById("form_label").innerHTML = "Create Item";
		
		document.getElementById("input_id").value = new Date().getTime();
		document.getElementById("input_name").value = "";
		document.getElementById("input_price").value = "";
		
		document.getElementById("form_button").textContent = "Create Item";
		document.getElementById("form_button").onclick = (() => createItem());
	}
	
	function showFormItemEdit(item) {
		document.getElementById("overlay").style.visibility = 'visible';
		document.getElementById("form_label").innerHTML = "Edit Item";
		
		document.getElementById("input_id").value = item.id;
		document.getElementById("input_name").value = item.name;
		document.getElementById("input_price").value = item.price;
		
		document.getElementById("form_button").textContent = "Update Item";
		document.getElementById("form_button").onclick = (() => updateItem());
	}
	
	function hideForm() {
		document.getElementById("overlay").style.visibility = 'hidden';
	}
	
	function createItem() {
		var id = document.getElementById("input_id").value;
		var name = document.getElementById("input_name").value;
		var price = document.getElementById("input_price").value;
		
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"id": parseInt(id), "name": name, "price": parseFloat(price)})
		};
		
		fetch(`${API_HOST}/api/item/create`, requestOptions)
			.then(response => response.json())
			.then(response => location.reload());
	}
	
	function updateItem() {
		var id = document.getElementById("input_id").value;
		var name = document.getElementById("input_name").value;
		var price = document.getElementById("input_price").value;
		
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"id": parseInt(id), "name": name, "price": parseFloat(price)})
		};
		
		fetch(`${API_HOST}/api/item/update`, requestOptions)
			.then(response => response.json())
			.then(response => location.reload());
	}
	
	function deleteItem(item) {
		const confirmed = window.confirm("Are you sure you want to delete this item?");
		
		if (confirmed) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({"id": item.id})
			};
		
			fetch(`${API_HOST}/api/item/delete`, requestOptions)
				.then(response => response.json())
				.then(response => location.reload());
		}
	}
	
	return (
		<div className="App">
			<div>
				<h1 align="center">Minimart</h1>
				
				<table align="center">
					<thead>
						<tr>
							<td width="600" align="left">
								Please refer to the pricelist below to place your orders.
							</td>
							<th width="100">
								<button onClick={() => showFormItemCreate()}>
									New Item
								</button>
							</th>
						</tr>
					</thead>
				</table>
				
				<table align="center" border="1">
					<thead>
						<tr>
							<th width="150">ID</th>
							<th width="250">Name</th>
							<th width="100">Price</th>
							<th width="100"></th>
							<th width="100"></th>
						</tr>
					</thead>
					<tbody>
					{
						data.map((item) => (
							<tr key={item.id} align="center">
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>${item.price.toFixed(2)}</td>
								<td>
									<button onClick={() => showFormItemEdit(item)}>
										Edit Item
									</button>
								</td>
								<td>
									<button onClick={() => deleteItem(item)}>
										Delete Item
									</button>
								</td>
							</tr>
						))
					}
					</tbody>
				</table>
			</div>
			
			<div id="overlay" className="overlay" onClick={() => hideForm()}>
				<div id="form" className="form" align="center">
					<h1 id="form_label" align="center"></h1>
					
					<table align="center">
						<tbody>
							<tr>
								<td width="50">ID</td>
								<td><input id="input_id" type="number" readOnly="readonly"/></td>
							</tr>
							
							<tr>
								<td width="50">Name</td>
								<td><input id="input_name" type="text"/></td>
							</tr>
							
							<tr>
								<td width="50">Price</td>
								<td><input id="input_price"/></td>
							</tr>
							
							<tr>
								<td colSpan="2" align="center">
									<button id="form_button"/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default App;