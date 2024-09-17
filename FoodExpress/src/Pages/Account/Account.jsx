import React from "react";
import styles from "./Account.module.css";

function Account() {
  return (
    <div className={styles.container}>
      <div className={styles.div1}>{/* Content for the left side */}</div>
      <div className={styles.div2}>
        <h1>Account</h1>
        
        <div className={styles.formContainer}>
          <button className={styles.loginGoogle}>Login with Google</button>

          {/* Line with text in the center */}
          <div className={styles.divider}>
            <span>or sign in with email</span>
          </div>
          

          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="" />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="" />
            </div>
            <label htmlFor="remember" className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                id="remember"
              />
              <span className={styles.customCheckbox}></span>
              Remember Me
            </label>
            <label htmlFor="remember" className={styles.forgotPassword}>
              Forgot Password? click here
            </label>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
