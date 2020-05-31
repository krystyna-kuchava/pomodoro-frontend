export function validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regexp.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    const regexp = /(.{8,})$/;

    return regexp.test(password);
}

export function validateName(name) {
    return name.length;
}
