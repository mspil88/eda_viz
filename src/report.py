from abc import ABC, abstractmethod
from typing import Callable
from math import ceil
import pandas as pd
from .missing import calculate_missing_values, df_level_missing_values
from .distinct import count_distinct, count_zero_values
from .examples import get_example
from .variable_stats import numeric_statistics, categorical_statistics
from .plots import histogram_values, frequency_values, scatterplot_data, box_plot_data
from .shape import get_shape
from .duplicates import get_duplicates
from .data_types import get_data_types, count_data_types
from .correlation import Pearson, Spearman, Kendall, Cramer, correlations

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
        self.dtype = None
        self.missing = None
        self.distinct = None
        self.zeros = None
        self.examples = None
        self.distribution = None
        self.stats = None

    def set_dtype(self):
        self.dtype = {"data_type": "numeric"}
        return self

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
        sampled_proportion = 0.01
        sample_size = ceil(len(column)*sampled_proportion)
        example = get_example(column, "sample", n=sample_size).data
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
            .retrieve_example(column).calculate_distribution(column).calculate_stats(column).set_dtype()

        return {self.name:
                    [
                     self.missing,
                     self.distinct,
                     self.zero,
                     self.examples,
                     self.distribution,
                     self.stats,
                     self.dtype]}


class CategoricalVariableReport(NumericVariableReport):

    def set_dtype(self):
        self.dtype = {"data_type": "categorical"}
        return self

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
    def count_duplicates(self):
        pass

    @abstractmethod
    def retrieve_data_types(self):
        pass

    @abstractmethod
    def retrieve_examples(self):
        pass

    @abstractmethod
    def generate_summary(self):
        pass


class OverviewReport(Overview):
    def __init__(self):
        self.num_variables = None
        self.num_obs = None
        self.missing = None
        self.missing_plot = None
        self.duplicate = None
        self.variable_type_mapping = None
        self.variable_types = None
        self.head = None
        self.tail = None
        self.correlations = None
        self.scatterplot_data = None
        self.boxplot_data = None

    def get_counts(self, df: pd.DataFrame):
        rows, columns = get_shape(df)
        self.num_obs = rows
        self.num_variables = columns
        return self

    def get_missing_values(self, df: pd.DataFrame):
        missing_info, missing_plot = df_level_missing_values(df)
        self.missing = missing_info
        self.missing_plot = missing_plot
        return self

    def count_duplicates(self, df: pd.DataFrame):
        self.duplicates = get_duplicates(df, self.num_obs["rows"])
        return self

    def retrieve_data_types(self, df:pd.DataFrame, **kwargs):
        self.variable_type_mapping = get_data_types(df)
        self.variable_types = count_data_types(self.variable_type_mapping)
        return self

    def retrieve_examples(self, df: pd.DataFrame):
        head = get_example(df, "head")
        tail = get_example(df, "tail")
        self.head = {"head": head.data}
        self.tail = {"tail": tail.data}
        return self

    def retrieve_correlations(self, df: pd.DataFrame):
        self.correlations = correlations(df)
        return self

    def retrieve_scatterplot_data(self, df: pd.DataFrame):
        self.scatterplot_data = scatterplot_data(df, self.variable_type_mapping['data_types'])
        # print(self.variable_type_mapping['data_types'])
        return self

    def retrieve_boxplot_data(self, df: pd.DataFrame):
        self.boxplot_data = box_plot_data(df, self.variable_type_mapping['data_types'])
        return self

    def generate_summary(self, df:pd.DataFrame):
        self.get_counts(df).get_missing_values(df).count_duplicates(df).retrieve_examples(df).retrieve_data_types(df).retrieve_correlations(df).retrieve_scatterplot_data(df).retrieve_boxplot_data(df)
        return {"overview":
            [self.num_obs,
                 self.num_variables,
                 self.missing,
                 self.missing_plot,
                 self.duplicates,
                 self.head,
                 self.tail,
                 self.variable_type_mapping,
                 self.variable_types,
                 self.correlations,
                 self.scatterplot_data,
                 self.boxplot_data]
                }
