from abc import ABC, abstractmethod
from typing import Callable
import pandas as pd
import numpy as np
from missing import calculate_missing_values, df_level_missing_values
from distinct import count_distinct, count_zero_values
from examples import get_example
from variable_stats import numeric_statistics, categorical_statistics
from plots import histogram_values, frequency_values
from shape import get_shape
from duplicates import get_duplicates


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
    def calculate_distribution(self, column: pd.Series):
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
        self.distribution = None
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

    def calculate_distribution(self, column: pd.Series):
        self.distribution = histogram_values(column)
        return self

    def generate_summary(self, column: pd.Series):
        self.calculate_missing(column).calculate_distinct(column).calculate_zeros(column)\
            .retrieve_example(column).calculate_distribution(column).calculate_stats(column)

        return {self.name:
                    [self.missing,
                     self.distinct,
                     self.zero,
                     self.examples,
                     self.distribution,
                     self.stats]}


class CategoricalVariableReport(NumericVariableReport):
    def calculate_stats(self, column: pd.Series):
        self.stats = categorical_statistics(column)
        return self

    def calculate_distribution(self, column: pd.Series):
        self.distribution = frequency_values(column)
        return self


class Overview(ABC):
    @abstractmethod
    def get_counts(self):
        pass

    @abstractmethod
    def get_missing_values(self):
        pass

    @abstractmethod
    def get_duplicates(self):
        pass

    @abstractmethod
    def get_data_types(self):
        pass

class OverviewReport(Overview):
    def __init__(self):
        self.num_variables = None
        self.num_obs = None
        self.missing = None
        self.misssing_plot = None
        self.duplicate = None
        self.variable_type_mapping = None
        self.variable_types = None

    def get_counts(self, df: pd.DataFrame):
        rows, columns = get_shape(df)
        self.num_obs = rows
        self.num_variables = columns
        return self

    def get_missing_values(self, df: pd.DataFrame):
        missing_info, missing_plot = df_level_missing_values(df)
        self.missing = missing_info
        self.misssing_plot = missing_plot
        return self

    def get_duplicates(self, df: pd.DataFrame):
        self.duplicates = get_duplicates(df)
        return self










