import { VerifyTX } from "../";

const App = async () => {
	try {
		await VerifyTX.getInstance().authorize({
			api: "https://api.dev.verifytx.com",
			username: "",
			password: "",
			client_id: "",
			client_secret: ""
		});
		// New vob
		const vob = await VerifyTX.getInstance().verify({
			first_name: "John",
			last_name: "Doe",
			member_id: "VTX123",
			payer: "",
			date_of_birth: "10/22/1991",
		});

		// Get vob by id
		const relations = await VerifyTX.getInstance().relations();

		// Reverify vob
		const reverifed_vob = await VerifyTX.getInstance().reverify(vob._id);

		// Get vob by id
		const view_vob = await VerifyTX.getInstance().view(vob._id);

		// Get vob by id
		const history = await VerifyTX.getInstance().history(vob._id);

		// Filter vobs
		const vobs = await VerifyTX.getInstance().vobs({
			skip: 0,
			limit: 10,
			first_name: "john"
		});

		// Update vob
		const updated_vob = await VerifyTX.getInstance().update(vob._id, { first_name: "Jane", last_name: "Doe", client_type: "client" });

	} catch (e) {
		console.error(e);
	}


}

App();