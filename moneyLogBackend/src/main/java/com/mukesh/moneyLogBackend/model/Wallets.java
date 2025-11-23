package com.mukesh.moneyLogBackend.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
public class Wallets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users users;

    @Column(nullable = false)
    private String name;

    private double balance;

    @OneToMany(mappedBy = "wallets", cascade = CascadeType.ALL)
    private List<Transactions> transactions;

    public Wallets() {

    }

    public Wallets(int id, Users users, String name, double balance) {
        this.id = id;
        this.users = users;
        this.name = name;
        this.balance = balance;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Transactions> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transactions> transactions) {
        this.transactions = transactions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Wallets{" +
                "id=" + id +
                ", users=" + users +
                ", name='" + name + '\'' +
                ", balance=" + balance +
                '}';
    }
}
