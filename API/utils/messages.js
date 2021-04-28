exports.msg = {
    ok: function () {
        return {
            code: 200,
            message: "Successful operation"
        }
    },
    format: function (error) {
        return {
            code: 400,
            message: error.toString()
        }
    },
    not_found: function (object) {
        return {
            code: 404,
            message: `The ${object} does not exist`
        }
    },
    internal_error: function (error) {
        return {
            message: "Internal ERROR",
            trace: error
        }
    }
};
