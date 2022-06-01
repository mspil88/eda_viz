from abc import ABC, abstractmethod
from typing import Callable
import pandas as pd
import numpy as np
from missing import calculate_missing_values
from distinct import count_distinct, count_zero_values
from examples import get_example
from variable_stats import numeric_statistics, categorical_statistics


class VariableReport(ABC):

    @abstractmethod
    def calculate_missing(self, column: pd.Series):
        pass

    @abstractmethod
    def calculate_distinct(self, column: pd.Series):
        pass

    @abstractmethod
    def calculate_zeros(self, column: pd.Series):
        pass

    @abstractmethod
    def retrieve_example(self, column: pd.Series):
        pass

    @abstractmethod
    def calculate_stats(self, column: pd.Series):
        pass

    @abstractmethod
    def generate_summary(self, column: pd.Series):
        pass


class NumericVariableReport(VariableReport):
    def __init__(self, name):
        self.name = name
        self.missing = None
        self.distinct = None
        self.zeros = None
        self.examples = None
        self.stats = None

    def _output_builder(self, func: Callable, column: pd.Series, name: str):
        return func(column)

    def calculate_missing(self, column: pd.Series):
        self.missing = self._output_builder(calculate_missing_values, column, "missing")
        return self

    def calculate_distinct(self, column: pd.Series):
        self.distinct = self._output_builder(count_distinct, column, "distinct")
        return self

    def calculate_zeros(self, column: pd.Series):
        self.zero = self._output_builder(count_zero_values, column, "zeros")
        return self

    def retrieve_example(self, column: pd.Series):
        example = get_example(column, "sample", n=10).data.values
        self.examples = {"example": example}
        return self

    def calculate_stats(self, column: pd.Series):
        self.stats = numeric_statistics(column)
        return self

    def generate_summary(self, column: pd.Series):
        self.calculate_missing(column).calculate_distinct(column).calculate_zeros(column)\
            .retrieve_example(column).calculate_stats(column)

        return {self.name:
                    [self.missing,
                     self.distinct,
                     self.zero,
                     self.examples,
                     self.stats]}




class CategoricalVariableReport(NumericVariableReport):
    def calculate_stats(self, column: pd.Series):
        self.stats = categorical_statistics(column)
        return self









