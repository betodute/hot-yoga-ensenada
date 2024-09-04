
// FETCHES & RESPONSE PARSING 

import React from 'react';
const API_BASE_URL = "http://localhost:9000/"


// USERS

export async function fetchUsers() {
  console.log ("hit fetchUsers in fetches.js")
}

export const loginUser = (username, password) => {
  console.log('hit loginUser in fetches.js')
  return fetch(`${API_BASE_URL}user/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
}


// YOGA CLASSES

export async function fetchYogaClasses() {
  console.log("hit fetchYogaClasses in fetches.js")
} 


// TEACHERS

export async function fetchTeachers() {
  console.log("hit fetchTeachers in fetches.js")
}


// RESERVATIONS

export async function fetchReservations() {
  console.log("hit fetchReservations in fetches.js")
}



