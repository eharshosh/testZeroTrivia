import * as React from "react";
const uploadError = (props) => {
    return <p className="error-message">
        חלה שגיאה בניסיון להעלות את הקובץ, סוג הקובץ אינו נתמך או שישנה בעיה בטיפול בקובץ בשרת.
    </p>;
}
export default uploadError;