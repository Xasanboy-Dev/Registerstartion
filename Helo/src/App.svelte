<script>
	import axios from "axios";
	let user = [];
	function getUser() {
		axios.get("http://localhost:1234/user").then((res) => {
			user = res.data.message;
		});
	}
	let name;
	let lastname;
	let email;
	let gender;
	let country;
	function createUser() {
		gender = gender == undefined ? "Female" : "Male";
		const newuser = {
			name,
			lastname,
			email,
			gender,
			country,
		};
		axios.post("http://localhost:1234/user", newuser);
		getUser();
	}
	function deleteMethod(user) {
		axios.delete(`http://localhost:1234/user/${user.id}`);
		getUser();
	}
	getUser();
</script>

<!-- HTML page -->
<main>
	<div class="card">
		{#each user as all}
			<div class="get">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="font" on:click={deleteMethod(all)}>
					<i class="fa-solid fa-xmark" />
				</div>
				<h2 class="id">Id:{all.id}</h2>
				<h3 class="name">Name:{all.name}</h3>
				<h3 class="surname">Surname:{all.lastname}</h3>
				<h4 class="email">Email:{all.email}</h4>
				<div class="footer">
					<h4>Gender:{all.gender}</h4>
					<h4>Country:{all.country}</h4>
				</div>
			</div>
		{/each}
		<form>
			<div class="form">
				<h1>New User</h1>
				<input
					bind:value={name}
					type="text"
					name="name"
					placeholder="Name"
					required
				/>
				<input
					required
					type="surname"
					bind:value={lastname}
					name="surname"
					placeholder="Surname"
				/>
				<input
					required
					type="email"
					bind:value={email}
					name="email"
					placeholder="Email"
				/>
				<div class="bool">
					<label for="male">Male</label>
					<input
						id="male"
						bind:value={gender}
						type="radio"
						name="bool"
					/>
					<label for="female">Female</label>
					<input
						id="female"
						bind:group={gender}
						type="radio"
						name="bool"
					/>
				</div>
				<input
					type="text"
					required
					placeholder="Country"
					bind:value={country}
				/>
				<button on:click={createUser}> Create </button>
			</div>
		</form>
	</div>
</main>

<!-- Style Css -->
<style>
	.font {
		color: black;
	}
	main {
		display: flex;
		height: 100%;
	}
	.card {
		flex-grow: 0.5;
		padding: 20px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	.form {
		display: flex;
		width: 350px;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
		border-left: 1px solid black;
	}
	.form h1 {
		color: red;
		display: flex;
		justify-content: center;
	}
	.form input,
	.form button {
		width: 115%;
		display: flex;
		font-size: large;
		align-items: center;
		justify-content: center;
	}
	input {
		font-size: large;
		align-items: center;
		justify-content: center;
	}
	.get .id,
	.get .name,
	.get .surname,
	.get .email .get .footer {
		display: flex;
		justify-content: center;
	}
	.get {
		height: fit-content;
		max-width: 300px;
		padding: 5px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		gap: 10px;
		border: 1px solid black;
	}
	.footer {
		display: flex;
		gap: 10px;
	}
</style>
