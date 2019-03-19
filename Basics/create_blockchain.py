#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar 18 21:31:12 2019

@author: shinigami
"""

import datetime
import hashlib
import json
from flask import Flask, jsonify

class Blockchain:
    def __init__(self):
        self.chain = []
        self.create_block(proof = 1, prev_hash = '0')
        
    def create_block(self, proof, prev_hash):
        block = {'index': len(self.chain)+1,
                 'timestamp' : str(datetime.datetime.now()),
                 'proof' : proof,
                 'prev_hash' : prev_hash}
        self.chain.append(block)
        return block
    
    def get_prev_block():
        return self.chain(-1)
    
    def proof_of_work(self, prev_hash):
        new_proof = 1
        check_proof = false
        while check_proof is False:
            