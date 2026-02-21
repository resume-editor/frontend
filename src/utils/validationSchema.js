import Joi from 'joi'

const emailSchema = Joi.string().trim().email().required().messages({

})

export const updateProfileSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).pattern(/^[A-Za-z\s]+$/).messages({
        'string.min': 'Name must contain minimum 2 characters',
        'string.max': 'Name must contain maximum 50 characters',
        'string.pattern.base': 'Name must contain only alphabets & spaces'
    }),
    email: emailSchema.optional()
}).or('name', 'email').messages({
    'object.missing': 'Either name or email is required'
})

export const changePasswordSchema = Joi.object({
    current_password: Joi.string().min(1).max(25).required().messages({

    }),
    new_password: Joi.string()
        .min(8)
        .max(25)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            "string.min": "New Password must be at least 8 characters long",
            "string.pattern.base":
                "New Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
            "string.empty": "New Password is required",
        }),

    confirm_password: Joi.string()
        .required()
        .valid(Joi.ref("new_password"))
        .messages({
            "any.only": "Confirm password must match password",
            "string.empty": "Confirm password is required",
        })
})