from abc import ABC, abstractmethod
import pandas as pd
import numpy as np
from missing import calculate_missing_values


class VariableReport(ABC):
    @abstractmethod
    def calculate_missing(self, column: pd.Series):
        pass
    @abstractmethod
    def calculate_distinct(self, column: pd.Series):
        pass
    @abstractmethod
    def calculate_stats(self, column: pd.Series):
        pass


class NumericVariableReport(VariableReport):
    def __init__(self):
        self.missing_values = None
        self.missing_proportion = None
        self.distinct = None
        self.distinct_proportion = None
        self.stats = None

    def calculate_missing(self, column: pd.Series):
        missing_values_dict = calculate_missing_values(column)
        self.missing_values = missing_values_dict['count']
        self.missing_proportion = missing_values_dict['proportion']









