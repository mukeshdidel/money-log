package com.mukesh.moneyLogBackend.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @ManyToOne
    @JoinColumn(name = "walletId", nullable = false)
    private Wallets wallets;

    @ManyToMany
    @JoinColumn(name = "category_id", nullable = false)
    private Categories categories;

    private double amount;

    private String type; // expense or income

    private LocalDateTime time;

    public Transactions() {

    }

    public Transactions(int id, Wallets wallets, Categories categories, double amount, String type, LocalDateTime time) {
        this.id = id;
        this.wallets = wallets;
        this.categories = categories;
        this.amount = amount;
        this.type = type;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Wallets getWallets() {
        return wallets;
    }

    public void setWallets(Wallets wallets) {
        this.wallets = wallets;
    }

    public Categories getCategories() {
        return categories;
    }

    public void setCategories(Categories categories) {
        this.categories = categories;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "Transactions{" +
                "id=" + id +
                ", wallets=" + wallets +
                ", categories=" + categories +
                ", amount=" + amount +
                ", type='" + type + '\'' +
                ", time=" + time +
                '}';
    }
}
