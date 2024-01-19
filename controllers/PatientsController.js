// import model patient
const PatientsModel = require("../models/PatientModel");

class JsonResponse {
    set(status, message, data = null) {
        return {
            status: status,
            message: message,
            data: data,
        };
    }
}

class PatientsController {
    // dapatkan semua pasien
    async index(req, res) {
        const response = new JsonResponse();
        const patients = await PatientsModel.all();

        try {
            if (patients.length > 0) {
                res.status(200).json(
                    response.set(
                        200,
                        "berhasil mengambil semua pasien",
                        patients
                    )
                );
            } else {
                res.status(404).json(
                    response.set(404, "pasien tidak ditemukan")
                );
            }
        } catch (err) {
            res.status(500).json(response.set(500, "ada server error", err));
        }
    }

    // dapatkan pasien berdasarkan id
    async show(req, res) {
        // json response
        const response = new JsonResponse();
        const patient = await PatientsModel.find(req.params.id);

        try {
            if (patient) {
                res.status(200).json(
                    response.set(
                        200,
                        "berhasil mengambil pasien dengan id",
                        patient
                    )
                );
            } else {
                res.status(404).json(
                    response.set(404, "pasien tidak ditemukan", patient)
                );
            }
        } catch (err) {
            response.set(500, "ada server error", err);
            console.log(err);
        }
    }

    // membuat pasien baru
    async store(req, res) {
        // json response
        const response = new JsonResponse();

        try {
            const patient = await PatientsModel.create(req.body);

            res.status(201).json(
                response.set(201, "berhasil membuat pasien", patient)
            );
        } catch (err) {
            response.set(500, "ada server error", err);
            console.log(err);
        }
    }

    // mengupdate pasien
    async update(req, res) {
        // json response
        const response = new JsonResponse();

        const patient = await PatientsModel.find(req.params.id);
        if (!patient) {
            return res
                .status(404)
                .json(response.set(404, "pasien tidak ditemukan"));
        }

        const data = {
            name: req.body["name"] || patient.name,
            address: req.body["address"] || patient.address,
            in_date_at: req.body["in_date_at"] || patient.in_date_at,
            out_date_at: req.body["out_date_at"] || patient.out_date_at,
            phone: req.body["phone"] || patient.phone,
            status: req.body["status"] || patient.status,
        };

        try {
            const patient = await PatientsModel.update(req.params.id, data);

            res.status(200).json(
                response.set(200, "berhasil mengubah pasien", patient)
            );
        } catch (err) {
            res.status(500).json(response.set(500, err.message));
            console.log(err);
        }
    }

    // menghapus pasien
    async destroy(req, res) {
        // json response
        const response = new JsonResponse();

        // check if patient is exist or not
        const patient = await PatientsModel.find(req.params.id);
        if (!patient) {
            return res
                .status(404)
                .json(response.set(404, "pasien tidak ditemukan"));
        }

        try {
            const patient = await PatientsModel.delete(req.params.id);

            res.status(200).json(
                response.set(200, "pasien berhasil  dihapus", patient)
            );
        } catch (err) {
            res.status(500).json(response.set(500, err.message));
            console.log(err);
        }
    }

    // mencari pasien berdasarkan nama
    async search(req, res) {
        // json response
        const response = new JsonResponse();

        try {
            const patients = await PatientsModel.search(req.params.name);

            res.status(200).json(
                response.set(200, "berhasil mencari pasien", patients)
            );
        } catch (err) {
            res.status(500).json(response.set(500, err.message));
            console.log(err);
        }
    }

    // mencari pasien berdasarkan status
    async status(req, res) {
        // json response
        const response = new JsonResponse();
        const status = req.params.status;

        if (
            status !== "recovered" &&
            status !== "positive" &&
            status !== "dead"
        ) {
            return res
                .status(400)
                .json(response.set(400, "status tidak valid"));
        }

        try {
            const patients = await PatientsModel.findByStatus(status);

            res.status(200).json(
                response.set(
                    200,
                    `berhasil mencari pasien dengan status ${status}`,
                    patients
                )
            );
        } catch (err) {
            res.status(500).json(response.set(500, err.message));
            console.log(err);
        }
    }
}

// export PatientsController
module.exports = new PatientsController();
